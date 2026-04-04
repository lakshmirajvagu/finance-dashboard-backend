/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Authentication APIs
 *   - name: Records
 *     description: Financial Records APIs
 *   - name: Summary
 *     description: Dashboard APIs
 *   - name: Users
 *     description: User Management APIs
 */


/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Lakshmi
 *               email:
 *                 type: string
 *                 example: admin@gmail.com
 *               password:
 *                 type: string
 *                 example: 123456
 *               role:
 *                 type: string
 *                 example: admin
 *     responses:
 *       201:
 *         description: User registered successfully
 */


/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user and get JWT token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@gmail.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Login successful
 */


/**
 * @swagger
 * /api/records:
 *   get:
 *     summary: Get all records (pagination supported)
 *     tags: [Records]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of records
 */


/**
 * @swagger
 * /api/records:
 *   post:
 *     summary: Create a new record (Admin only)
 *     tags: [Records]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Record created
 */


/**
 * @swagger
 * /api/records/filter:
 *   get:
 *     summary: Filter records with pagination and sorting (Admin & Analyst)
 *     tags: [Records]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         example: income
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         example: salary
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         example: 5
 */


/**
 * @swagger
 * /api/records/search:
 *   get:
 *     summary: Search records (Admin & Analyst)
 *     tags: [Records]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         example: salary
 */


/**
 * @swagger
 * /api/records/{id}:
 *   put:
 *     summary: Update record (Admin only)
 *     tags: [Records]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 */


/**
 * @swagger
 * /api/records/{id}:
 *   delete:
 *     summary: Soft delete record (Admin only)
 *     tags: [Records]
 *     security:
 *       - bearerAuth: []
 */


/**
 * @swagger
 * /api/records/restore/{id}:
 *   put:
 *     summary: Restore deleted record (Admin only)
 *     tags: [Records]
 *     security:
 *       - bearerAuth: []
 */


/**
 * @swagger
 * /api/summary:
 *   get:
 *     summary: Get overall financial summary (Admin & Analyst)
 *     tags: [Summary]
 *     security:
 *       - bearerAuth: []
 */


/**
 * @swagger
 * /api/summary/category:
 *   get:
 *     summary: Get category-wise summary (Admin & Analyst)
 *     tags: [Summary]
 *     security:
 *       - bearerAuth: []
 */


/**
 * @swagger
 * /api/summary/monthly:
 *   get:
 *     summary: Get monthly trends (Admin & Analyst)
 *     tags: [Summary]
 *     security:
 *       - bearerAuth: []
 */


/**
 * @swagger
 * /api/summary/recent:
 *   get:
 *     summary: Get recent activity (All roles)
 *     tags: [Summary]
 *     security:
 *       - bearerAuth: []
 */


/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users (Admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 */


/**
 * @swagger
 * /api/users/{id}/status:
 *   put:
 *     summary: Toggle user active/inactive (Admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 */