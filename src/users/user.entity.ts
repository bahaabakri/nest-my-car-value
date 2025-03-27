import { Exclude } from "class-transformer";
import { Entity, Column, PrimaryGeneratedColumn, AfterInsert, AfterRemove, AfterUpdate } from "typeorm";
@Entity()
export default class User {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    email:string;

    @Column()
    password:string;

    @AfterInsert()
    afterInsert() {
        console.log(`User with id ${this.id} has been Inserted`)
    }

    @AfterRemove()
    afterRemove() {
        console.log(`User with id ${this.id} has been removed`)
    }

    @AfterUpdate()
    afterUpdate() {
        console.log(`User with id ${this.id} has been updated`)
    }
}