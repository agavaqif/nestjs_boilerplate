import { UserRole } from "src/enums/user-role.enum";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class User {

    @PrimaryGeneratedColumn()
    userId: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column({select:false})
    password: string;

    @Column({type: 'enum', enum: UserRole, default: UserRole.USER})
    role: UserRole
}
