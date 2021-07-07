import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  UsePipes,
} from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { BeneficiaryService } from './beneficiary.service'
import { CreateBeneficiary } from './dto/create-beneficiary.dto'
import { Beneficiaries } from './entities/beneficiary.entity'
import { BeneficiaryResponse } from './entities/beneficiary-response.entity'
import { InputValidationPipe } from './pipes/input-validation.pipe'

@ApiTags('Beneficiary Registration APIs')
@Controller('beneficiary')
export class BeneficiaryController {
  constructor(private readonly beneficiaryService: BeneficiaryService) {}

  @ApiBearerAuth('JWT-auth')
  @ApiUnauthorizedResponse({ description: 'UnAuthorized' })
  @ApiCreatedResponse({
    type: BeneficiaryResponse,
    description: 'Beneficiary added',
  })
  @UseGuards(JwtAuthGuard)
  @Post()
  @UsePipes(new InputValidationPipe())
  async create(@Body() createBeneficiary: CreateBeneficiary): Promise<any> {
    // return await this.beneficiaryService.create(createBeneficiary)
  }

  @ApiBearerAuth('JWT-auth')
  @ApiUnauthorizedResponse({ description: 'UnAuthorized' })
  @ApiOkResponse({ type: Beneficiaries })
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return await this.beneficiaryService.findAll()
  }

  @ApiBearerAuth('JWT-auth')
  @ApiUnauthorizedResponse({ description: 'UnAuthorized' })
  @ApiNotFoundResponse({ description: 'Could not found beneficiary' })
  @ApiOkResponse({ type: Beneficiaries })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.beneficiaryService.findOne(id)
  }

  @ApiBearerAuth('JWT-auth')
  @ApiUnauthorizedResponse({ description: 'UnAuthorized' })
  @ApiNotFoundResponse({ description: 'Could not found beneficiary' })
  @ApiCreatedResponse({
    type: BeneficiaryResponse,
    description: 'Beneficiary removed',
  })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<BeneficiaryResponse> {
    return await this.beneficiaryService.remove(id)
  }
}
