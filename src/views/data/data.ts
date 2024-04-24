import { ref } from 'vue'

export class Step{
    id : number;
    name : string;
    category : string;
    isTemplate : boolean;
    isRenderItem : boolean;
    isIfStep :boolean;
    details : details[];
    level : number;
    constructor(id: number, name: string,category : string,isTemplate : boolean,isRenderItem : boolean,isIfStep :boolean,level : number,details : details[]) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.isTemplate = isTemplate;
        this.isRenderItem = isRenderItem;
        this.isIfStep = isIfStep;
        this.details = details;
        this.level = level;
    }
}

export class details {
    detailsId : number;
    detailsName : string;
    description : string

    constructor(detailsId: number, detailsName: string,description : string) {
        this.detailsId = detailsId;
        this.detailsName = detailsName;
        this.description = description;
      }
}

export const masterDatas = ref<Step[]>([
    new Step( 1,'Item 1','cat1',true,false,false,1,
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
//,
//     new Step(2,'Item 2','cat2',true,false,true,2,
//         [
//             {
//                 detailsId : 1,
//                 detailsName : 'Details 1',
//                 description : ''
//             },
//             {
//                 detailsId : 2,
//                 detailsName : 'Details 2',
//                 description : ''
//             }
//         ]
//     ),
//     new Step(2,'Item 2-2','cat2',true,false,true,2,
//     [
//         {
//             detailsId : 1,
//             detailsName : 'Details 1',
//             description : ''
//         },
//         {
//             detailsId : 2,
//             detailsName : 'Details 2',
//             description : ''
//         }
//     ]
// )
// ,
//     new Step(2,'Item 2-3','cat2',true,false,true,3,
//     [
//         {
//             detailsId : 1,
//             detailsName : 'Details 1',
//             description : ''
//         },
//         {
//             detailsId : 2,
//             detailsName : 'Details 2',
//             description : ''
//         }
//     ]
// )
,
    new Step(5,'Item 4','cat5',true,false,false,1,
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
    new Step(5,'Item 5','cat5',true,false,false,1,
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
    new Step(1,'THEN : Add an action','cat1',false,false,false,1,
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
      new Step(2,'IF:Add a condition','cat2', false,false,true,1,
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
      new Step(3,'IF or ELSE : Add conition options','cat3',false,false,false,1,
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