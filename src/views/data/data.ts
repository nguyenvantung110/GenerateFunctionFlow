import { ref } from 'vue'

export class Step{
    id : Number;
    name : String;
    category : String;
    isTemplate : Boolean;
    details : details[];
    level : Number;
    constructor(id: Number, name: String,category : String,isTemplate : Boolean,level : Number,details : details[]) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.isTemplate = isTemplate;
        this.details = details;
        this.level = level;
    }

    IsNullOrEmpty(val : String){
        const data = val.trim();
        if(data === null || data === undefined || data === ''){
            return false;
        }

        return true;
    }
}

export class details {
    detailsId : Number;
    detailsName : String;
    description : String

    constructor(detailsId: Number, detailsName: String,description : String) {
        this.detailsId = detailsId;
        this.detailsName = detailsName;
        this.description = description;
      }
}

export const masterDatas = ref<Step[]>([
    new Step( 1,'Item 1','cat1',true,1,
        [
            {
                detailsId : 1,
                detailsName : 'Details 1',
                description : ''
            },
            {
                detailsId : 2,
                detailsName : 'Details 2',
                description : ''
            }
        ]
    ),
    new Step( 1,'Item 1-1','cat1',true,1,
        [
            {
                detailsId : 1,
                detailsName : 'Details 1',
                description : ''
            },
            {
                detailsId : 2,
                detailsName : 'Details 2',
                description : ''
            }
        ]
    ),
    new Step( 1,'Item 1-2','cat1',true,1,
        [
            {
                detailsId : 1,
                detailsName : 'Details 1',
                description : ''
            },
            {
                detailsId : 2,
                detailsName : 'Details 2',
                description : ''
            }
        ]
    ),
    new Step(2,'Item 2','cat2',true,2,
        [
            {
                detailsId : 1,
                detailsName : 'Details 1',
                description : ''
            },
            {
                detailsId : 2,
                detailsName : 'Details 2',
                description : ''
            }
        ]
    ),
    new Step(2,'Item 2-2','cat2',true,2,
    [
        {
            detailsId : 1,
            detailsName : 'Details 1',
            description : ''
        },
        {
            detailsId : 2,
            detailsName : 'Details 2',
            description : ''
        }
    ]
),
    new Step(3,'Item 3','cat3',true,3,
        [
            {
                detailsId : 1,
                detailsName : 'Details 1',
                description : ''
            },
            {
                detailsId : 2,
                detailsName : 'Details 2',
                description : ''
            }
        ]
    ),
    new Step(3,'Item 3-1','cat3',true,3,
        [
            {
                detailsId : 1,
                detailsName : 'Details 1',
                description : ''
            },
            {
                detailsId : 2,
                detailsName : 'Details 2',
                description : ''
            }
        ]
    ),
    new Step(3,'Item 3-1-1','cat3',true,4,
    [
        {
            detailsId : 1,
            detailsName : 'Details 1',
            description : ''
        },
        {
            detailsId : 2,
            detailsName : 'Details 2',
            description : ''
        }
    ]
),
new Step(3,'Item 3-1-1','cat3',true,5,
    [
        {
            detailsId : 1,
            detailsName : 'Details 1',
            description : ''
        },
        {
            detailsId : 2,
            detailsName : 'Details 2',
            description : ''
        }
    ]
),
    new Step(4,'Item 4','cat4',true,2,
        [
            {
                detailsId : 1,
                detailsName : 'Details 1',
                description : ''
            },
            {
                detailsId : 2,
                detailsName : 'Details 2',
                description : ''
            }
        ]
    ),
    new Step(4,'Item 4-1','cat4',true,2,
        [
            {
                detailsId : 1,
                detailsName : 'Details 1',
                description : ''
            },
            {
                detailsId : 2,
                detailsName : 'Details 2',
                description : ''
            }
        ]
    ),
    new Step(5,'Item 5','cat5',true,1,
        [
            {
                detailsId : 1,
                detailsName : 'Details 1',
                description : ''
            },
            {
                detailsId : 2,
                detailsName : 'Details 2',
                description : ''
            }
        ]
    ),
    new Step(5,'Item 5-1','cat5',true,2,
        [
            {
                detailsId : 1,
                detailsName : 'Details 1',
                description : ''
            },
            {
                detailsId : 2,
                detailsName : 'Details 2',
                description : ''
            }
        ]
    ),
    new Step(5,'Item 5-2','cat5',true,2,
        [
            {
                detailsId : 1,
                detailsName : 'Details 1',
                description : ''
            },
            {
                detailsId : 2,
                detailsName : 'Details 2',
                description : ''
            }
        ]
    ),
    new Step(5,'Item 6','cat5',true,1,
        [
            {
                detailsId : 1,
                detailsName : 'Details 1',
                description : ''
            },
            {
                detailsId : 2,
                detailsName : 'Details 2',
                description : ''
            }
        ]
    )
  ])

export const masterTemplateData = ref([
    new Step(1,'Item 1','cat1',true,1,
            [
              {
                  detailsId : 1,
                  detailsName : 'Details 1',
                  description : ''
              },
              {
                  detailsId : 2,
                  detailsName : 'Details 2',
                  description : ''
              }
           ]
        ),
      new Step(2,'Item 2','cat2', true,1,
            [
              {
                  detailsId : 1,
                  detailsName : 'Details 1',
                  description : ''
              },
              {
                  detailsId : 2,
                  detailsName : 'Details 2',
                  description : ''
              }
           ]
        ),
      new Step(3,'Item 3','cat3',true,1,
            [
              {
                  detailsId : 1,
                  detailsName : 'Details 1',
                  description : ''
              },
              {
                  detailsId : 2,
                  detailsName : 'Details 2',
                  description : ''
              }
            ]
        )
    ])