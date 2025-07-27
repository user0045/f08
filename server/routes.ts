import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://kxlqebcjpefqtbwdxdss.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt4bHFlYmNqcGVmcXRid2R4ZHNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk3NzU5MTEsImV4cCI6MjA2NTM1MTkxMX0.yCgy6oFmYLpmv-F7P04k43PMMqPD8YQQ1_Hz40YSMAk";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export async function registerRoutes(app: Express): Promise<Server> {
  // Admin authentication endpoints

  // Admin login endpoint
  app.post("/api/admin/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      const userIP = req.ip || req.connection.remoteAddress || 'unknown';

      if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
      }

      // Check if IP is blocked
      const isBlocked = await storage.isIpBlocked(userIP);
      if (isBlocked) {
        return res.status(429).json({ 
          error: 'Too many failed login attempts. Please try again after 45 minutes.' 
        });
      }

      // Authenticate admin
      const admin = await storage.authenticateAdmin(username, password);

      if (admin) {
        // Record successful login attempt
        await storage.recordLoginAttempt(userIP, username, true);
        // Reset failed attempts after successful login
        await storage.resetFailedAttempts(userIP);
        res.json({ 
          success: true, 
          message: 'Login successful',
          admin: { id: admin.id, admin_name: admin.admin_name }
        });
      } else {
        // Record failed login attempt
        await storage.recordLoginAttempt(userIP, username, false);

        // Check how many failed attempts remain
        const failedAttempts = await storage.getRecentFailedAttempts(userIP);
        const remainingAttempts = 5 - failedAttempts;

        if (remainingAttempts <= 0) {
          return res.status(429).json({ 
            error: 'Too many failed login attempts. IP blocked for 45 minutes.' 
          });
        }

        res.status(401).json({ 
          error: 'Invalid credentials',
          remainingAttempts: remainingAttempts
        });
      }
    } catch (error) {
      console.error('Error during admin login:', error);
      res.status(500).json({ error: 'Internal server error during login' });
    }
  });

  // Check if IP is blocked endpoint
  app.post("/api/admin/check-blocked", async (req, res) => {
    try {
      const userIP = req.ip || req.connection.remoteAddress || 'unknown';
      const isBlocked = await storage.isIpBlocked(userIP);
      const failedAttempts = await storage.getRecentFailedAttempts(userIP);

      res.json({ 
        isBlocked,
        failedAttempts,
        remainingAttempts: Math.max(0, 5 - failedAttempts)
      });
    } catch (error) {
      console.error('Error checking blocked status:', error);
      res.status(500).json({ error: 'Failed to check blocked status' });
    }
  });

  // Advertisement requests endpoints

  // Get all advertisement requests
  app.get("/api/advertisement-requests", async (req, res) => {
    try {
      const requests = await storage.getAdvertisementRequests();
      res.json(requests);
    } catch (error) {
      console.error('Error fetching advertisement requests:', error);
      res.status(500).json({ error: 'Failed to fetch advertisement requests' });
    }
  });

  // Create new advertisement request
  app.post("/api/advertisement-requests", async (req, res) => {
    try {
      const { email, description, budget, userIP } = req.body;

      if (!email || !description || !budget || !userIP) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      // Validate budget range
      const budgetAmount = parseFloat(budget);
      if (budgetAmount < 5000) {
        return res.status(400).json({ error: 'Minimum budget is ₹5,000' });
      }
      if (budgetAmount > 100000000) {
        return res.status(400).json({ error: 'Maximum budget is ₹10,00,00,000' });
      }

      // Check rate limiting (1 hour)
      const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
      const recentRequest = await storage.checkRecentAdvertisementRequest(userIP, oneHourAgo);

      if (recentRequest) {
        return res.status(429).json({ 
          error: 'You can only make one advertisement request every hour. Please try again later.' 
        });
      }

      const newRequest = await storage.createAdvertisementRequest({
        email,
        description,
        budget: parseFloat(budget),
        user_ip: userIP
      });

      res.status(201).json(newRequest);
    } catch (error) {
      console.error('Error creating advertisement request:', error);
      res.status(500).json({ error: 'Failed to create advertisement request' });
    }
  });

  // Delete advertisement request
  app.delete("/api/advertisement-requests/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteAdvertisementRequest(id);
      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error deleting advertisement request:', error);
      res.status(500).json({ error: 'Failed to delete advertisement request' });
    }
  });

  // Check recent advertisement request
  app.post("/api/check-recent-ad-request", async (req, res) => {
    try {
      const { userIP, since } = req.body;
      const hasRecentRequest = await storage.checkRecentAdvertisementRequest(userIP, new Date(since));
      res.json({ hasRecentRequest });
    } catch (error) {
      console.error('Error checking recent advertisement request:', error);
      res.status(500).json({ error: 'Failed to check recent advertisement request' });
    }
  });

  // View tracking endpoints

  // Increment movie views
  app.post("/api/views/movie/:contentId", async (req, res) => {
    try {
      const { contentId } = req.params;
      console.log('Incrementing movie views for contentId:', contentId);

      if (!contentId) {
        return res.status(400).json({ error: 'Content ID is required' });
      }

      await storage.incrementMovieViews(contentId);
      res.json({ success: true, message: 'Movie view incremented' });
    } catch (error) {
      console.error('Error incrementing movie views:', error);
      res.status(500).json({ error: 'Failed to increment movie views', details: error.message });
    }
  });

  // Increment episode views
  app.post("/api/views/episode/:episodeId", async (req, res) => {
    try {
      const { episodeId } = req.params;
      console.log('=== EPISODE VIEW INCREMENT REQUEST ===');
      console.log('Episode ID:', episodeId);
      console.log('Request IP:', req.ip);
      console.log('Request headers:', req.headers);

      if (!episodeId || episodeId.trim() === '') {
        console.error('Episode ID is missing or empty');
        return res.status(400).json({ error: 'Episode ID is required and cannot be empty' });
      }

      console.log('Calling storage.incrementEpisodeViews for:', episodeId);
      const result = await storage.incrementEpisodeViews(episodeId);
      console.log('Storage result:', result);
      
      res.json({ success: true, message: 'Episode view incremented', result });
    } catch (error) {
      console.error('Error incrementing episode views:', error);
      res.status(500).json({ error: 'Failed to increment episode views', details: error.message });
    }
  });

  // Increment show episode views
  app.post("/api/views/show/:episodeId", async (req, res) => {
    try {
      const { episodeId } = req.params;
      console.log('Incrementing show episode views for episodeId:', episodeId);

      if (!episodeId || episodeId.trim() === '') {
        return res.status(400).json({ error: 'Episode ID is required and cannot be empty' });
      }

      await storage.incrementEpisodeViews(episodeId);
      res.json({ success: true, message: 'Show episode view incremented' });
    } catch (error) {
      console.error('Error incrementing show episode views:', error);
      res.status(500).json({ error: 'Failed to increment show episode views', details: error.message });
    }
  });

  // Get views for different content types
  app.get("/api/views/:contentType/:contentId", async (req, res) => {
    try {
      const { contentType, contentId } = req.params;
      console.log('Getting views for:', contentType, contentId);

      let views = 0;
      
      switch (contentType) {
        case 'movie':
          views = await storage.getMovieViews(contentId);
          break;
        case 'episode':
          views = await storage.getEpisodeViews(contentId);
          break;
        case 'show':
          views = await storage.getShowViews(contentId);
          break;
        case 'season':
          views = await storage.getSeasonViews(contentId);
          break;
        case 'web-series':
          views = await storage.getWebSeriesViews(contentId);
          break;
        default:
          return res.status(400).json({ error: 'Invalid content type' });
      }

      res.json({ views });
    } catch (error) {
      console.error('Error getting views:', error);
      res.status(500).json({ error: 'Failed to get views', details: error.message });
    }
  });

  // Get views for any content type
  app.get("/api/views/:contentType/:contentId", async (req, res) => {
    try {
      const { contentType, contentId } = req.params;

      if (!contentId || !contentType) {
        return res.status(400).json({ error: 'Content ID and type are required' });
      }

      let views = 0;

      switch (contentType) {
        case 'movie':
          views = await storage.getMovieViews(contentId);
          break;
        case 'show':
          views = await storage.getShowViews(contentId);
          break;
        case 'web-series':
          views = await storage.getWebSeriesViews(contentId);
          break;
        case 'episode':
          views = await storage.getEpisodeViews(contentId);
          break;
        case 'season':
          views = await storage.getSeasonViews(contentId);
          break;
        default:
          return res.status(400).json({ error: 'Invalid content type' });
      }

      res.json({ views });
    } catch (error) {
      console.error('Error getting views:', error);
      res.status(500).json({ error: 'Failed to get views', details: error.message });
    }
  });

  // Get platform statistics
  app.get("/api/platform-stats", async (req, res) => {
    try {
      const stats = await storage.getPlatformStats();
      res.json(stats);
    } catch (error) {
      console.error('Error getting platform stats:', error);
      res.status(500).json({ error: 'Failed to get platform stats', details: error.message });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}