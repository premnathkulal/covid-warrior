import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { BeneficiaryService } from './beneficiary.service'
import { CreateBeneficiary } from './dto/create-beneficiary.dto'
import { CreateBeneficiaryResponse } from './entities/create-beneficiary.entity'

@ApiTags('Beneficiary Registration APIs')
@Controller('beneficiary')
export class BeneficiaryController {
  constructor(private readonly beneficiaryService: BeneficiaryService) {}

  @ApiBearerAuth('JWT-auth')
  @ApiUnauthorizedResponse({ description: 'UnAuthorized' })
  @ApiCreatedResponse({
    type: CreateBeneficiaryResponse,
    description: 'Beneficiary added',
  })
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createBeneficiary: CreateBeneficiary,
  ): Promise<CreateBeneficiaryResponse> {
    return await this.beneficiaryService.create(createBeneficiary)
  }

  @ApiBearerAuth('JWT-auth')
  @ApiUnauthorizedResponse({ description: 'UnAuthorized' })
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return await this.beneficiaryService.findAll()
  }

  @ApiBearerAuth('JWT-auth')
  @ApiUnauthorizedResponse({ description: 'UnAuthorized' })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.beneficiaryService.findOne(id)
  }

  @ApiBearerAuth('JWT-auth')
  @ApiUnauthorizedResponse({ description: 'UnAuthorized' })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.beneficiaryService.remove(id)
  }
}
