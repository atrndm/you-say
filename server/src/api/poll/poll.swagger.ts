/* tslint:disable */
/**
 * @swagger
 * /polls:
 *   post:
 *     summary: Create a new Poll
 * 
 *     requesgBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Poll'
 *     responses:
 *       201:
 *         description: Create a new poll.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Poll'
 *
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Poll:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           example: The Poll's Title
 *         status:
 *           type: string
 *           enum: [draft, active, completed]
 *           example: active
 *         slug:
 *           type: string
 *           example: the-polls-url
 */