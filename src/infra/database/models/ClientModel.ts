import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class ClientModel {
     @PrimaryGeneratedColumn('uuid')
     client_id!: string;

     @Column('varchar')
     nome!: string;

     @Column('varchar')
     sobrenome!: string;

     @Column('smallint')
     idade!: number;

     @Column('varchar', { unique: true })
     email!: string;

     @Column('varchar', { length: 100 })
     senha!: string;

     @Column('varchar')
     role!: string;

     @Column('timestamp')
     created_at!: Date;
}
