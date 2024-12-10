-- CreateEnum
CREATE TYPE "permissao" AS ENUM ('ADMIN', 'USUARIO', 'GESTOR');

-- CreateTable
CREATE TABLE "produto" (
    "id_produto" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "base_custo" DOUBLE PRECISION NOT NULL,
    "margem_lucro" DOUBLE PRECISION NOT NULL,
    "material_principal" TEXT NOT NULL,

    CONSTRAINT "produto_pkey" PRIMARY KEY ("id_produto")
);

-- CreateTable
CREATE TABLE "cliente" (
    "id_cliente" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "contato" TEXT,
    "endereco" TEXT,

    CONSTRAINT "cliente_pkey" PRIMARY KEY ("id_cliente")
);

-- CreateTable
CREATE TABLE "imagem" (
    "id_imagem" SERIAL NOT NULL,
    "origem" TEXT NOT NULL,
    "custo_adicional" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "imagem_pkey" PRIMARY KEY ("id_imagem")
);

-- CreateTable
CREATE TABLE "pedido" (
    "id_pedido" SERIAL NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "valor_total" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL,
    "cliente_id" INTEGER,

    CONSTRAINT "pedido_pkey" PRIMARY KEY ("id_pedido")
);

-- CreateTable
CREATE TABLE "personalizacao" (
    "id_personalizacao" SERIAL NOT NULL,
    "tipo" TEXT NOT NULL,
    "valor_adicional" DOUBLE PRECISION NOT NULL,
    "detalhes" TEXT,

    CONSTRAINT "personalizacao_pkey" PRIMARY KEY ("id_personalizacao")
);

-- CreateTable
CREATE TABLE "item_pedido" (
    "id_item" SERIAL NOT NULL,
    "quantidade" INTEGER NOT NULL DEFAULT 1,
    "preco_total" DOUBLE PRECISION NOT NULL,
    "pedido_id" INTEGER NOT NULL,
    "produto_id" INTEGER NOT NULL,
    "imagem_id" INTEGER,
    "personalizacao_id" INTEGER,

    CONSTRAINT "item_pedido_pkey" PRIMARY KEY ("id_item")
);

-- CreateTable
CREATE TABLE "usuario" (
    "id_usuario" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "permissao" "permissao" NOT NULL DEFAULT 'USUARIO',
    "data_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ultimo_login" TIMESTAMP(3),

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id_usuario")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_email_key" ON "usuario"("email");

-- AddForeignKey
ALTER TABLE "pedido" ADD CONSTRAINT "pedido_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "cliente"("id_cliente") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_pedido" ADD CONSTRAINT "item_pedido_pedido_id_fkey" FOREIGN KEY ("pedido_id") REFERENCES "pedido"("id_pedido") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_pedido" ADD CONSTRAINT "item_pedido_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "produto"("id_produto") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_pedido" ADD CONSTRAINT "item_pedido_imagem_id_fkey" FOREIGN KEY ("imagem_id") REFERENCES "imagem"("id_imagem") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_pedido" ADD CONSTRAINT "item_pedido_personalizacao_id_fkey" FOREIGN KEY ("personalizacao_id") REFERENCES "personalizacao"("id_personalizacao") ON DELETE SET NULL ON UPDATE CASCADE;
