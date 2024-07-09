import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  overview!: string;

  @Column()
  release_date!: string;

  @Column()
  poster_path!: string;

  @Column()
  backdrop_path!: string;
}
