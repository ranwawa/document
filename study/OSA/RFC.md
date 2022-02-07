### OpenApi Object

OAS根节点字段有8个

- 3必填的
  - openapi - string
  - info - object
  - paths - object
- 5个可选的
  - servers - array
  - coponents - object
  - security - array
  - tags
  - externalDocs

#### Paths Object

paths节点下路径的2种格式

- 参数形式 /pets/{petId}
- 固定值形式 /pets/mine

#### Paths Item Object

Paths item节点下13个属性

- 1个全局的
  - $ref - string
- 4个通用的
  - summary - string
  - description - string
  - servers - array
  - parameters - array

- 8个操作相关的
  - get - object
  - put
  - post
  - delete
  - options
  - head
  - patch
  - trace

#### Operation Object

paths.path.get下的12个属性

- 9个本身的
  - tags
  - summary
  - description
  - operationId
  - requestBody
  - responses
  - callbacks
  - deprecated
  - externalDocs
- 3个可重写父元素的
  - parameters - array
  - security - array
  - servers - array

#### requestBody Object

paths.path.get.requestBody的3个属性

- content - array

- description - string

- required - boolean

  

paths.path.get.requestBody.content的4个属性

- schema - object
- example - any
- examples - object
- encoding - object