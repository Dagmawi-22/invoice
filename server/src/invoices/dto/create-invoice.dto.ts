import { ApiProperty } from '@nestjs/swagger';

export class CreateItemDto {
  @ApiProperty({ description: 'Item Description', example: 'Service A' })
  description: string;

  @ApiProperty({ description: 'Item quantity', example: 2 })
  quantity: number;

  @ApiProperty({ description: 'Item price', example: 50.25 })
  price: number;
}

export class CreateInvoiceDto {
  @ApiProperty({
    type: [CreateItemDto],
    description: 'List of invoice items',
  })
  items: CreateItemDto[];

  @ApiProperty({ description: 'Total amount', example: 100.5 })
  totalAmount: number;

  @ApiProperty({
    description: 'Due date',
    example: '2023-12-31T23:59:59.999Z',
  })
  dueDate: Date;
}
