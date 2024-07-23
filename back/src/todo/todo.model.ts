import { Column, DataType, Model, Table } from "sequelize-typescript";

interface TodoCreationAttrs {
    title: string;
    description: string;
    createDate: string;
}

@Table({ tableName: "todo" })
export class Todo extends Model<Todo, TodoCreationAttrs> {
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    title: string;

    @Column({ type: DataType.STRING, allowNull: false })
    description: string;

    @Column({ type: DataType.STRING, allowNull: false })
    createDate: string;
}
