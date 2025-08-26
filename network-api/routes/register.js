```typescript
import { Controller, Post, Body, HttpStatus, HttpException } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    try {
      const userId = await this.authService.register(createUserDto);
      return {
        status: 'success',
        message: 'User registered successfully',
        userId: userId, // Include userId in the response
      };
    } catch (error) {
      if (error.code === '23505') {
        // Duplicate email error
        throw new HttpException(
          {
            status: 'error',
            message: 'Email already exists',
            errors: { email: 'This email is already registered.' }, // Specific error for email field
          },
          HttpStatus.CONFLICT,
        );
      } else if (error instanceof HttpException) {
        // Re-throw other HTTP exceptions
        throw error; 
      } else {
        // Handle other errors (e.g., validation errors from the service)
        throw new HttpException(
          {
            status: 'error',
            message: error.message,
            errors: error.errors || {}, // Include validation errors if available
          },
          HttpStatus.BAD_REQUEST, // Or another appropriate status code
        );
      }
    }
  }


}

```