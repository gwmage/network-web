import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { GetApplicationDto } from './dto/get-application.dto';
import { Application } from './entities/application.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateApplicationDto } from './dto/create-application.dto';
import { User } from '../user/entities/user.entity';

@Injectable()
export class ApplicationService {
  private readonly logger = new Logger(ApplicationService.name);

  constructor(
    @InjectRepository(Application)
    private readonly applicationRepository: Repository<Application>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getApplication(getApplicationDto: GetApplicationDto, user: User): Promise<{ applications: Application[]; totalCount: number }> {
    try {
      const { page, pageSize, sortField, sortOrder, filter } = getApplicationDto;

      const queryBuilder = this.applicationRepository.createQueryBuilder('application');
      // Add filtering, sorting, and pagination logic here based on getApplicationDto

      const [applications, totalCount] = await queryBuilder.getManyAndCount();

      return { applications, totalCount };
    } catch (error) {
      this.logger.error('Error retrieving applications', error);
      throw new InternalServerErrorException('An error occurred while retrieving applications');
    }
  }


  async createApplication(createApplicationDto: CreateApplicationDto, user: User): Promise<Application> {
    try {
      const newApplication = this.applicationRepository.create({
        ...createApplicationDto,
        user, // Associate the application with the logged-in user
      });
      return await this.applicationRepository.save(newApplication);
    } catch (error) {
      this.logger.error('Error creating application', error);
      throw new InternalServerErrorException('An error occurred while creating the application');
    }
  }


}
