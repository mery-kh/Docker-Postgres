import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
export  enum Langs {
    HE = 'he',
    RU = 'ru',
    EN = 'en',
}
@Entity()
export default class Book {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column({ unique: true })
    public name: string;

    @Column()
    public type: string;

    @Column({
        type: 'enum',
        enum: [Langs.HE, Langs.RU, Langs.EN],
        default: Langs.RU,
    })
    lang: Langs;
}
