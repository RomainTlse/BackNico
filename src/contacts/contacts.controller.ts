import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Post, Put, Res } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Contact } from './schemas/contact.schema';

@Controller('api/contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Post()
  async create(@Body() createCatDto: CreateContactDto) {
    await this.contactsService.create(createCatDto);
  }

  @Get()
  async findAll(@Res() res): Promise<Contact[]> {
    const contacts = await this.contactsService.findAll();
    return res.status(HttpStatus.OK).json(contacts);
  }

  @Get('/:id')
  public async findOne(@Res() res, @Param('id') contactId: string) {
    const contact = await this.contactsService.findOne(contactId);
    if (!contact) {
      throw new NotFoundException('Contact does not exist!');
    }
    return res.status(HttpStatus.OK).json(contact);
  }

  @Put('/:id')
  public async updateContact(
    @Res() res,
    @Param('id') contactId: string,
    @Body() updateContactDto: UpdateContactDto,
  ) {
    try {
      const contact = await this.contactsService.update(
        contactId,
        updateContactDto,
      );
      if (!contact) {
        throw new NotFoundException('Contact does not exist!');
      }
      return res.status(HttpStatus.OK).json({
        message: 'Contact has been successfully updated',
        contact,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: Contact not updated!',
        status: 400,
      });
    }
  }

  @Delete('/:id')
  public async deleteContact(@Res() res, @Param('id') contactId: string) {
    if (!contactId) {
      throw new NotFoundException('Contact ID does not exist');
    }

    const contact = await this.contactsService.remove(contactId);

    if (!contact) {
      throw new NotFoundException('Contact does not exist');
    }

    return res.status(HttpStatus.OK).json({
      message: 'Contact has been deleted',
      contact,
    });
  }
}
