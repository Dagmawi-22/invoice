import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';

@Injectable()
export class InvoicesService {
  constructor(private prisma: PrismaService) {}

  async create(createInvoiceDto: CreateInvoiceDto) {
    const { items, ...invoiceData } = createInvoiceDto;

    const invoice = await this.prisma.invoice.create({
      data: {
        ...invoiceData,
        items: {
          create: items,
        },
      },
      include: {
        items: true,
      },
    });

    return invoice;
  }

  async findAll() {
    return await this.prisma.invoice.findMany({
      include: {
        items: true,
      },
    });
  }

  async findOne(id: string) {
    const invoice = await this.prisma.invoice.findUnique({
      where: { id },
      include: { items: true },
    });

    if (!invoice) {
      throw new Error(`Invoice with ID ${id} not found`);
    }

    return invoice;
  }

  async update(id: string, updateInvoiceDto: UpdateInvoiceDto) {
    const { items, ...invoiceData } = updateInvoiceDto;

    const invoice = await this.prisma.invoice.update({
      where: { id },
      data: {
        ...invoiceData,
        items: {
          deleteMany: {},
          create: items,
        },
      },
      include: {
        items: true,
      },
    });

    return invoice;
  }

  async remove(id: string) {
    const invoice = await this.prisma.invoice.delete({
      where: { id },
      include: {
        items: true,
      },
    });

    return invoice;
  }
}
