
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
 *     summary: Get all records with pagination (Every role)
 *     tags: [Records]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 5
 *     responses:
 *       200:
 *         description: Success
 */


/**
 * @swagger
 * /api/records:
 *   post:
 *     summary: Create record (Admin only)
 *     tags: [Records]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [amount, type, category]
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 5000
 *               type:
 *                 type: string
 *                 example: income
 *               category:
 *                 type: string
 *                 example: salary
 *               notes:
 *                 type: string
 *                 example: Monthly salary
 *     responses:
 *       201:
 *         description: Created
 */

/**
 * @swagger
 * /api/records/filter:
 *   get:
 *     summary: Filter records by type, category, or date range  (Every role )
 *     tags: [Records]
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
 *         name: startDate
 *         schema:
 *           type: string
 *         example: 2025-01-01
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *         example: 2025-12-31
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
 *     responses:
 *       200:
 *         description: Filtered records fetched successfully
 */


/**
 * @swagger
 * /api/records/{id}:
 *   put:
 *     summary: Update record (Admin only)
 *     tags: [Records]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 69d0f508335151f276d2ce1b
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 6000
 *               category:
 *                 type: string
 *                 example: updated salary
 *     responses:
 *       200:
 *         description: Record updated successfully
 */


/**
 * @swagger
 * /api/records/search:
 *   get:
 *     summary: Search records by category or notes (every role)
 *     tags: [Records]
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *         example: salary
 *     responses:
 *       200:
 *         description: Search results fetched successfully
 */


/**
 * @swagger
 * /api/records/restore/{id}:
 *   put:
 *     summary: Restore a soft-deleted record (Admin only)
 *     tags: [Records]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 69d0f6bc075b695bf36e5a81
 *     responses:
 *       200:
 *         description: Record restored successfully
 */


/**
 * @swagger
 * /api/records/{id}:
 *   delete:
 *     summary: Soft delete record (Admin only)
 *     tags: [Records]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 69d0f6bc075b695bf36e5a81
 *     responses:
 *       200:
 *         description: Record deleted successfully
 */


/**
 * @swagger
 * /api/summary:
 *   get:
 *     summary: Get overall financial summary (Admin & Analyst)
 *     tags: [Summary]
 *     responses:
 *       200:
 *         description: Returns total income, expense, and balance
 */


/**
 * @swagger
 * /api/summary/category:
 *   get:
 *     summary: Get category-wise summary (Admin & Analyst)
 *     tags: [Summary]
 *     responses:
 *       200:
 *         description: Returns totals grouped by category
 */


/**
 * @swagger
 * /api/summary/monthly:
 *   get:
 *     summary: Get monthly trends (Admin & Analyst)
 *     tags: [Summary]
 *     parameters:
 *       - in: query
 *         name: year
 *         schema:
 *           type: integer
 *         example: 2026
 *     responses:
 *       200:
 *         description: Returns monthly income and expense trends
 */


/**
 * @swagger
 * /api/summary/recent:
 *   get:
 *     summary: Get recent activity (All roles)
 *     tags: [Summary]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         example: 5
 *     responses:
 *       200:
 *         description: Returns latest transactions
 */


/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users (Admin only)
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of all users
 *         content:
 *           application/json:
 *             example:
 *               count: 2
 *               data:
 *                 - _id: "69d0f6bc075b695bf36e5a81"
 *                   name: "Lakshmi"
 *                   email: "admin@gmail.com"
 *                   role: "admin"
 *                   isActive: true
 */


/**
 * @swagger
 * /api/users/{id}/status:
 *   put:
 *     summary: Toggle user active/inactive status (Admin only)
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 69d0f6bc075b695bf36e5a81
 *     responses:
 *       200:
 *         description: User status updated
 *         content:
 *           application/json:
 *             example:
 *               message: "User is now inactive"
 *               data:
 *                 _id: "69d0f6bc075b695bf36e5a81"
 *                 name: "Lakshmi"
 *                 email: "admin@gmail.com"
 *                 role: "admin"
 *                 isActive: false
 */