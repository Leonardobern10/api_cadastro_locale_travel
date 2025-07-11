import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

      @Column('varchar')
      email!: string;

      @Column('varchar')
      senha!: string;

      @Column('varchar')
      role!: string;

      @Column('date')
      created_at!: Date;

}