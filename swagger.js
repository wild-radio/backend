import { URL } from './constants/network';
import { version } from './package.json';

export default {
  swagger: '2.0',
  host: URL,
  schemes: ['http'],
  info: {
    description: 'Documentação da API do backend do WildRadio',
    version,
    title: 'WildRadio backend',
  },
  tags: [
    {
      name: 'cameras',
      description: 'Serviços de fotos e configuração das câmeras',
    },
    {
      name: 'catalogos',
      description: 'Serviços para gerenciamento de catálogos',
    },
    {
      name: 'sistemas',
      description: 'Serviços para consulta de sistemas embarcados',
    },
  ],
  paths: {
    // Câmeras
    '/cameras/{idCamera}/configuracao': {
      get: {
        tags: ['cameras'],
        summary: 'Consulta a configuração de uma câmera',
        operationId: 'consultaConfiguracao',
        produces: ['application/json'],
        parameters: [
          {
            name: 'idCamera',
            in: 'path',
            description: 'ID da câmera',
            required: true,
            type: 'integer',
            format: 'int64',
          },
        ],
        responses: {
          200: {
            description: 'Consulta bem sucedida',
            schema: { $ref: '#/definitions/ConfiguracaoApi' },
          },
          404: {
            description: 'Câmera não encontrada',
          },
          500: {
            description: 'Erro interno',
          },
        },
      },
      put: {
        tags: ['cameras'],
        summary: 'Atualiza a configuração de uma câmera',
        operationId: 'atualizaConfiguracao',
        consumes: ['application/json'],
        produces: ['application/json'],
        parameters: [
          {
            name: 'idCamera',
            in: 'path',
            description: 'ID da câmera',
            required: true,
            type: 'integer',
            format: 'int64',
          },
          {
            name: 'body',
            in: 'body',
            description: 'Configurações',
            required: true,
            schema: { $ref: '#/definitions/ConfiguracaoApi' },
          },
        ],
        responses: {
          200: {
            description: 'Atualização bem sucedida',
            schema: { $ref: '#/definitions/ConfiguracaoApi' },
          },
          404: {
            description: 'Câmera não encontrada',
          },
          500: {
            description: 'Erro interno',
          },
        },
      },
    },
    '/cameras/{idCamera}/configuracao/confirmacao': {
      post: {
        tags: ['cameras'],
        summary: 'Envia uma solicitação de foto para confirmação do ajuste do ângulo',
        operationId: 'solicitaConfirmacaoConfiguracao',
        parameters: [
          {
            name: 'idCamera',
            in: 'path',
            description: 'ID da câmera',
            required: true,
            type: 'integer',
            format: 'int64',
          },
        ],
        responses: {
          200: {
            description: 'Solicitação bem sucedida',
          },
          404: {
            description: 'Câmera não encontrada',
          },
          500: {
            description: 'Erro interno',
          },
        },
      },
    },
    '/cameras/{idCamera}/configuracao/confirmacao/foto': {
      post: {
        tags: ['cameras'],
        summary: 'Envia a foto de confirmação do ajuste do ângulo',
        operationId: 'fotoConfirmacaoConfiguracao',
        consumes: ['application/json'],
        parameters: [
          {
            name: 'idCamera',
            in: 'path',
            description: 'ID da câmera',
            required: true,
            type: 'integer',
            format: 'int64',
          },
          {
            name: 'body',
            in: 'body',
            description: 'Foto',
            required: true,
            schema: { $ref: '#/definitions/FotoApi' },
          },
        ],
        responses: {
          200: {
            description: 'Envio bem sucedido',
          },
          404: {
            description: 'Câmera não encontrada',
          },
          500: {
            description: 'Erro interno',
          },
        },
      },
    },
    '/cameras/{idCamera}/fotos': {
      get: {
        tags: ['cameras'],
        summary: 'Consulta as novas fotos de uma câmera',
        operationId: 'consultaFotosCamera',
        produces: ['application/json'],
        parameters: [
          {
            name: 'idCamera',
            in: 'path',
            description: 'ID da câmera',
            required: true,
            type: 'integer',
            format: 'int64',
          },
        ],
        responses: {
          200: {
            description: 'Consulta bem sucedida',
            schema: { type: 'array', items: { $ref: '#/definitions/FotoApi' } },
          },
          404: {
            description: 'Câmera não encontrada',
          },
          500: {
            description: 'Erro interno',
          },
        },
      },
      post: {
        tags: ['cameras'],
        summary: 'Insere uma novo foto para uma câmera',
        operationId: 'insereFotoCamera',
        consumes: ['application/json'],
        parameters: [
          {
            name: 'idCamera',
            in: 'path',
            description: 'ID da câmera',
            required: true,
            type: 'integer',
            format: 'int64',
          },
          {
            name: 'body',
            in: 'body',
            description: 'Foto',
            required: true,
            schema: { $ref: '#/definitions/FotoApi' },
          },
        ],
        responses: {
          200: {
            description: 'Envio bem sucedido',
          },
          404: {
            description: 'Câmera não encontrada',
          },
          500: {
            description: 'Erro interno',
          },
        },
      },
    },
    '/cameras/{idCamera}/fotos/{idFoto}': {
      delete: {
        tags: ['cameras'],
        summary: 'Descarta uma foto de uma câmera',
        operationId: 'descartaFotoCamera',
        parameters: [
          {
            name: 'idCamera',
            in: 'path',
            description: 'ID da câmera',
            required: true,
            type: 'integer',
            format: 'int64',
          },
          {
            name: 'idFoto',
            in: 'path',
            description: 'ID da foto',
            required: true,
            type: 'integer',
            format: 'int64',
          },
        ],
        responses: {
          200: {
            description: 'Remoção bem sucedida',
          },
          404: {
            description: 'Foto ou camera não encontradas',
          },
          500: {
            description: 'Erro interno',
          },
        },
      },
    },
    // Catálogos
    '/catalogos': {
      get: {
        tags: ['catalogos'],
        summary: 'Consulta os catálogos existentes',
        operationId: 'consultaCatalogos',
        produces: ['application/json'],
        responses: {
          200: {
            description: 'Consulta bem sucedida',
            schema: { type: 'array', items: { $ref: '#/definitions/CatalogoApi' } },
          },
          500: {
            description: 'Erro interno',
          },
        },
      },
      post: {
        tags: ['catalogos'],
        summary: 'Insere um novo catálogo',
        operationId: 'insereCatalogo',
        consumes: ['application/json'],
        produces: ['application/json'],
        parameters: [
          {
            name: 'body',
            in: 'body',
            description: 'Catálogo',
            required: true,
            schema: { $ref: '#/definitions/CatalogoApi' },
          },
        ],
        responses: {
          200: {
            description: 'Inserção bem sucedida',
            schema: { $ref: '#/definitions/CatalogoApi' },
          },
          500: {
            description: 'Erro interno',
          },
        },
      },
    },
    '/catalogos/{idCatalogo}': {
      put: {
        tags: ['catalogos'],
        summary: 'Atualiza um catálogo',
        operationId: 'atualizaCatalogo',
        consumes: ['application/json'],
        produces: ['application/json'],
        parameters: [
          {
            name: 'idCatalogo',
            in: 'path',
            description: 'ID do catálogo',
            required: true,
            type: 'integer',
            format: 'int64',
          },
          {
            name: 'body',
            in: 'body',
            description: 'Catálogo',
            required: true,
            schema: { $ref: '#/definitions/CatalogoApi' },
          },
        ],
        responses: {
          200: {
            description: 'Edição bem sucedida',
            schema: { $ref: '#/definitions/CatalogoApi' },
          },
          404: {
            description: 'Catálogo não encontrado',
          },
          500: {
            description: 'Erro interno',
          },
        },
      },
      delete: {
        tags: ['catalogos'],
        summary: 'Remove um catálogo, removendo todas suas fotos',
        operationId: 'removeCatalogo',
        parameters: [
          {
            name: 'idCatalogo',
            in: 'path',
            description: 'ID do catálogo',
            required: true,
            type: 'integer',
            format: 'int64',
          },
        ],
        responses: {
          200: {
            description: 'Remoção bem sucedida',
          },
          404: {
            description: 'Catálogo não encontrado',
          },
          500: {
            description: 'Erro interno',
          },
        },
      },
    },
    '/catalogos/{idCatalogo}/fotos': {
      get: {
        tags: ['catalogos'],
        summary: 'Consulta as fotos de um catálogo',
        operationId: 'consultaFotosCatalogo',
        produces: ['application/json'],
        parameters: [
          {
            name: 'idCatalogo',
            in: 'path',
            description: 'ID do catálogo',
            required: true,
            type: 'integer',
            format: 'int64',
          },
        ],
        responses: {
          200: {
            description: 'Consulta bem sucedida',
            schema: { type: 'array', items: { $ref: '#/definitions/FotoApi' } },
          },
          404: {
            description: 'Catálogo não encontrado',
          },
          500: {
            description: 'Erro interno',
          },
        },
      },
    },
    '/catalogos/{idCatalogo}/fotos/{idFoto}': {
      put: {
        tags: ['catalogos'],
        summary: 'Adiciona uma foto existente a um catálogo',
        operationId: 'adicionaFotoCatalogo',
        consumes: ['application/json'],
        parameters: [
          {
            name: 'idCatalogo',
            in: 'path',
            description: 'ID do catálogo',
            required: true,
            type: 'integer',
            format: 'int64',
          },
          {
            name: 'idFoto',
            in: 'path',
            description: 'ID da foto',
            required: true,
            type: 'integer',
            format: 'int64',
          },
        ],
        responses: {
          200: {
            description: 'Inserção bem sucedida',
          },
          404: {
            description: 'Catálogo ou foto não encontrados',
          },
          500: {
            description: 'Erro interno',
          },
        },
      },
      delete: {
        tags: ['catalogos'],
        summary: 'Remove uma foto de um catálogo, removendo-a permanentemente do sistema',
        operationId: 'removeFotoCatalogo',
        consumes: ['application/json'],
        parameters: [
          {
            name: 'idCatalogo',
            in: 'path',
            description: 'ID do catálogo',
            required: true,
            type: 'integer',
            format: 'int64',
          },
          {
            name: 'idFoto',
            in: 'path',
            description: 'ID da foto',
            required: true,
            type: 'integer',
            format: 'int64',
          },
        ],
        responses: {
          200: {
            description: 'Remoção bem sucedida',
          },
          404: {
            description: 'Catálogo ou foto não encontrados',
          },
          500: {
            description: 'Erro interno',
          },
        },
      },
    },
    '/catalogos/{idCatalogoOrigem}/fotos/transferir-para/{idCatalogoDestino}': {
      put: {
        tags: ['catalogos'],
        summary: 'Transfere todas as fotos de um catálogo para outro',
        operationId: 'transfereFotosCatalogo',
        consumes: ['application/json'],
        parameters: [
          {
            name: 'idCatalogoOrigem',
            in: 'path',
            description: 'ID do catálogo de origem',
            required: true,
            type: 'integer',
            format: 'int64',
          },
          {
            name: 'idCatalogoDestino',
            in: 'path',
            description: 'ID do catálogo de destino',
            required: true,
            type: 'integer',
            format: 'int64',
          },
        ],
        responses: {
          200: {
            description: 'Transferência bem sucedida',
          },
          404: {
            description: 'Catálogo de origem e/ou destino não encontrados',
          },
          500: {
            description: 'Erro interno',
          },
        },
      },
    },
    // Sistemas
    '/sistemas': {
      get: {
        tags: ['sistemas'],
        summary: 'Consulta os sistemas cadastrados',
        operationId: 'consultaSistemas',
        produces: ['application/json'],
        responses: {
          200: {
            description: 'Consulta bem sucedida',
            schema: { type: 'array', items: { $ref: '#/definitions/SistemaApi' } },
          },
          500: {
            description: 'Erro interno',
          },
        },
      },
    },
  },
  definitions: {
    ConfiguracaoApi: {
      type: 'object',
      properties: {
        id: {
          type: 'integer',
          format: 'int64',
        },
        idCamera: {
          type: 'integer',
          format: 'int64',
        },
        ativa: {
          type: 'integer',
          format: 'int64',
        },
        temporizador: {
          type: 'integer',
          format: 'int64',
        },
        presenca: {
          type: 'integer',
          format: 'int64',
        },
        horizontal: {
          type: 'integer',
          format: 'int64',
        },
        vertical: {
          type: 'integer',
          format: 'int64',
        },
      },
    },
    FotoApi: {
      type: 'object',
      properties: {
        id: {
          type: 'integer',
          format: 'int64',
        },
        idCatalogo: {
          type: 'integer',
          format: 'int64',
        },
        dataHoraCaptura: {
          type: 'integer',
          format: 'int64',
        },
        conteudo: {
          type: 'string',
        },
      },
    },
    CatalogoApi: {
      type: 'object',
      properties: {
        id: {
          type: 'integer',
          format: 'int64',
        },
        nome: {
          type: 'string',
        },
      },
    },
    SistemaApi: {
      type: 'object',
      properties: {
        id: {
          type: 'integer',
          format: 'int64',
        },
        identificacao: {
          type: 'string',
        },
        cameras: {
          type: 'array',
          items: { $ref: '#/definitions/CameraApi' },
        },
      },
    },
    CameraApi: {
      type: 'object',
      properties: {
        id: {
          type: 'integer',
          format: 'int64',
        },
        idSistema: {
          type: 'integer',
          format: 'int64',
        },
        principal: {
          type: 'integer',
          format: 'int64',
        },
        ligada: {
          type: 'integer',
          format: 'int64',
        },
        fotosNovas: {
          type: 'integer',
          format: 'int64',
        },
      },
    },
  },
};
