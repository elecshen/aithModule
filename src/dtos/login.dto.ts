/**
 * @swagger
 * components:
 *   schemas:
 *     LoginBody:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           example: john.doe@example.com
 *         password:
 *           type: string
 *           example: secret
 */
export interface LoginBody {
  email: string;
  password: string;
}
