import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import {
  ApiInvoices,
  ApiCreateInvoice,
  ApiGetAllInvoices,
  ApiGetInvoiceById,
  ApiUpdateInvoice,
  ApiDeleteInvoice,
} from './swagger-decorators/decorators';

@ApiInvoices()
@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Post()
  @ApiCreateInvoice()
  create(@Body() createInvoiceDto: CreateInvoiceDto) {
    return this.invoicesService.create(createInvoiceDto);
  }

  @Get()
  @ApiGetAllInvoices()
  findAll() {
    return this.invoicesService.findAll();
  }

  @Get(':id')
  @ApiGetInvoiceById()
  findOne(@Param('id') id: string) {
    return this.invoicesService.findOne(id);
  }

  @Put(':id')
  @ApiUpdateInvoice()
  update(@Param('id') id: string, @Body() updateInvoiceDto: UpdateInvoiceDto) {
    return this.invoicesService.update(id, updateInvoiceDto);
  }

  @Delete(':id')
  @ApiDeleteInvoice()
  remove(@Param('id') id: string) {
    return this.invoicesService.remove(id);
  }
}
