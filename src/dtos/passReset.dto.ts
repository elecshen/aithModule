/**
 * @swagger
 * components:
 *   schemas:
 *     PassResetBody:
 *       type: object
 *       required:
 *         - password
 *         - newPassword
 *       properties:
 *         password:
 *           type: string
 *           example: oldSecret
 *         newPassword:
 *           type: string
 *           example: newSecret
 */
export interface PassResetBody {
  password: string;
  newPassword: string;
}
