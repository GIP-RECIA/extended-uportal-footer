# <extended-uportal-footer> Element

Configurable footer element make to be used with GIP Recia uPortal

## Usage

### Script

With a script tag:
`<script type="module" src="path/to/project/extended-uportal-footer/dist/js/extended-uportal-footer.min.js">`
or
`<script type="module" src="path/to/release/extended-uportal-footer.min.js">`

### Markup

Basic

```html
<extended-uportal-footer
  domain="localhost:3000"
  portal-path="/portal"
  template-api-path="/portal/api/template.json"
  debug
>
</extended-uportal-footer>
```

| attribute   | type    | default        | description                                                           |
| ----------- | ------- | -------------- | --------------------------------------------------------------------- |
| domain      | string  | current domain | domain to use with api path and assets form template                  |
| portal-path | string  | empty          | path to add to the domain for assets form template (not used for api) |
| debug       | boolean | false          | set debug mode (used only for development purpose)                    |

Using a path from domain for template api (see [json schemas](#template-api-json-schemas))

```html
<extended-uportal-footer
  domain="localhost:3000"
  template-api-path="/portal/api/template.json"
  ...
>
</extended-uportal-footer>
```

| attribute         | type   | default       | description                          |
| ----------------- | ------ | ------------- | ------------------------------------ |
| template-api-path | string | .ENV constant | path to the template api from domain |

Using an url for template api (see [json schemas](#template-api-json-schemas))

```html
<extended-uportal-footer
  ...
  template-api-url="httph://api.test.org/api/template.json"
>
</extended-uportal-footer>
```

| attribute        | type   | default | description             |
| ---------------- | ------ | ------- | ----------------------- |
| template-api-url | string | empty   | url to the template api |

Using a json object for template (see [json schemas](#template-api-json-schemas))

```html
<extended-uportal-footer ... template="{datas:[...]}">
</extended-uportal-footer>
```

| attribute | type   | default | description                                                                                                |
| --------- | ------ | ------- | ---------------------------------------------------------------------------------------------------------- |
| template  | string | empty   | json object describing templates. Must be compliant with the [API JSONschemas](#template-api-json-schemas) |

## Template API JSON Schemas

```json
{
  "$schema": "http://json-schema.org/schema",
  "$id": "https://recia.fr/ent.template.schema.json",
  "title": "Template",
  "description": "An ENT Template",
  "type": "object",
  "properties": {
    "data": {
      "description": "Items list",
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "identity": {
            "description": "Identity of the template",
            "type": "object",
            "properties": {
              "Id": {
                "description": "Id of the template",
                "type": "string",
                "pattern": "(?i)^(?=.*[a-z])[a-z0-9_-]*$"
              },
              "name": {
                "description": "name of the template",
                "type": "string"
              },
              "domains": {
                "description": "list of the possible domains",
                "type": "array",
                "items": {
                  "type": "string"
                },
                "minItems": 1
              },
              "uai": {
                "description": "list of the possible uais",
                "type": "array",
                "items": {
                  "type": "string"
                }
              }
            },
            "required": ["Id", "name"]
          },
          "images": {
            "description": "list of template images",
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "Id": {
                  "description": "Id of the image",
                  "type": "string",
                  "pattern": "(?i)^(?=.*[a-z])[a-z0-9_-]*$"
                },
                "name": {
                  "description": "Name of the image",
                  "type": "string"
                },
                "path": {
                  "description": "path to the image",
                  "type": "string"
                },
                "url": {
                  "description": "url of the image",
                  "type": "string"
                },
                "parameters": {
                  "description": "parameters of the image, for exemple css properties",
                  "type": "array",
                  "items": {
                    "type": "object",
                    "properties": {
                      "propertie": {
                        "description": "name/id of the propertie",
                        "type": "string"
                      },
                      "value": {
                        "description": "value of the propertie",
                        "type": "string"
                      }
                    }
                  }
                }
              },
              "oneOf": [
                {
                  "required": ["Id", "name", "path"]
                },
                {
                  "required": ["Id", "name", "url"]
                }
              ]
            }
          },
          "colors": {
            "description": "list of template colors",
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "Id": {
                  "description": "Id of the color",
                  "type": "string",
                  "pattern": "(?i)^(?=.*[a-z])[a-z0-9_-]*$"
                },
                "hexa": {
                  "description": "Color's hexadecimal value",
                  "type": "string",
                  "pattern": "(?i)^#(?:[0-9a-f]{3}|[0-9a-f]{6})$"
                },
                "rgb": {
                  "description": "Color's rgb values",
                  "type": "object",
                  "properties": {
                    "r": {
                      "description": "red",
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 255
                    },
                    "g": {
                      "description": "green",
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 255
                    },
                    "b": {
                      "description": "blue",
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 255
                    }
                  },
                  "required": ["r", "g", "b"]
                }
              },
              "required": ["Id", "hexa", "rgb"]
            }
          },
          "sponsors": {
            "description": "list of sponsors",
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "Id": {
                  "description": "Id of the sponsor",
                  "type": "string",
                  "pattern": "(?i)^(?=.*[a-z])[a-z0-9_-]*$"
                },
                "name": {
                  "description": "Name of the sponsor",
                  "type": "string"
                },
                "url": {
                  "description": "Url of the sponsor",
                  "type": "string"
                },
                "logo": {
                  "type": "object",
                  "properties": {
                    "path": {
                      "description": "path to the image",
                      "type": "string"
                    },
                    "url": {
                      "description": "url of the image",
                      "type": "string"
                    },
                    "parameters": {
                      "description": "parameters of the image, for exemple css properties",
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "propertie": {
                            "description": "name/id of the propertie",
                            "type": "string"
                          },
                          "value": {
                            "description": "value of the propertie",
                            "type": "string"
                          }
                        }
                      }
                    }
                  },
                  "oneOf": [
                    {
                      "required": ["path"]
                    },
                    {
                      "required": ["url"]
                    }
                  ]
                }
              },
              "required": ["Id", "name", "logo"]
            }
          }
        }
      }
    }
  }
}
```
