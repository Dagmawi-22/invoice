import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiParam } from '@nestjs/swagger';

export function ApiInvoices() {
  return applyDecorators(ApiTags('invoices'));
}

export function ApiCreateInvoice() {
  return applyDecorators(
    ApiOperation({ summary: 'Create a new invoice' }),
    ApiResponse({
      status: 201,
      description: 'The invoice has been successfully created.',
    }),
    ApiResponse({ status: 400, description: 'Invalid input.' }),
  );
}

export function ApiGetAllInvoices() {
  return applyDecorators(
    ApiOperation({ summary: 'Get all invoices' }),
    ApiResponse({ status: 200, description: 'Return all invoices.' }),
  );
}

export function ApiGetInvoiceById() {
  return applyDecorators(
    ApiOperation({ summary: 'Get an invoice by ID' }),
    ApiParam({ name: 'id', description: 'ID of the invoice' }),
    ApiResponse({ status: 200, description: 'Return the invoice.' }),
    ApiResponse({ status: 404, description: 'Invoice not found.' }),
  );
}

export function ApiUpdateInvoice() {
  return applyDecorators(
    ApiOperation({ summary: 'Update an invoice' }),
    ApiParam({ name: 'id', description: 'ID of the invoice' }),
    ApiResponse({
      status: 200,
      description: 'The invoice has been successfully updated.',
    }),
    ApiResponse({ status: 404, description: 'Invoice not found.' }),
  );
}

export function ApiDeleteInvoice() {
  return applyDecorators(
    ApiOperation({ summary: 'Delete an invoice' }),
    ApiParam({ name: 'id', description: 'ID of the invoice' }),
    ApiResponse({
      status: 200,
      description: 'The invoice has been successfully deleted.',
    }),
    ApiResponse({ status: 404, description: 'Invoice not found.' }),
  );
}
