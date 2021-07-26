import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Contact } from './schemas/contact.schema';
import { Model } from 'mongoose';
import { IContact } from "./interfaces/contact.interface";

@Injectable()
export class ContactsService {
  constructor(
    @InjectModel(Contact.name)
    private readonly contactModel: Model<Contact>,
  ) {}

  async create(CreateContactDto: CreateContactDto): Promise<Contact> {
    const createdCat = new this.contactModel(CreateContactDto);
    return createdCat.save();
  }

  async findAll(): Promise<Contact[]> {
    console.log(this.contactModel.find().exec());
    return this.contactModel.find().exec();
  }

  async findOne(contactId: string): Promise<Contact> {
    const contact = await this.contactModel.findById({ _id: contactId }).exec();

    if (!contact) {
      throw new NotFoundException(`Contact #${contactId} not found`);
    }

    return contact;
  }

  public async update(
    contactId: string,
    updateContactDto: UpdateContactDto,
  ): Promise<IContact> {
    const existingContact = await this.contactModel.findByIdAndUpdate(
      { _id: contactId },
      updateContactDto,
    );

    if (!existingContact) {
      throw new NotFoundException(`Contact #${contactId} not found`);
    }

    return existingContact;
  }

  public async remove(contactId: string): Promise<any> {
    const deletedContact = await this.contactModel.findByIdAndRemove(contactId);
    return deletedContact;
  }
}
