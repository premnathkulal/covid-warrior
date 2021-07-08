import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  UsePipes,
  Request,
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
import { Beneficiaries } from './dto/beneficiary.dto'
import { BeneficiaryResponse } from './dto/beneficiary-response.dto'
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
  async create(
    @Request() req,
    @Body() createBeneficiary: CreateBeneficiary,
  ): Promise<any> {
    const username = req.user.username
    return await this.beneficiaryService.create(createBeneficiary, username)
  }

  @ApiBearerAuth('JWT-auth')
  @ApiUnauthorizedResponse({ description: 'UnAuthorized' })
  @ApiOkResponse({ type: Beneficiaries })
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Request() req) {
    const username = req.user.username
    return await this.beneficiaryService.findAll(username)
  }

  @ApiBearerAuth('JWT-auth')
  @ApiUnauthorizedResponse({ description: 'UnAuthorized' })
  @ApiNotFoundResponse({ description: 'Could not found beneficiary' })
  @ApiOkResponse({ type: Beneficiaries })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Request() req, @Param('id') id: string) {
    const username = req.user.username
    return await this.beneficiaryService.findOne(id, username)
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
  async remove(
    @Request() req,
    @Param('id') id: string,
  ): Promise<BeneficiaryResponse> {
    const username = req.user.username
    return await this.beneficiaryService.remove(id, username)
  }
}
