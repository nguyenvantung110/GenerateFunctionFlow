// directives/indent.ts
import { DirectiveBinding, VNode } from 'vue'

// export default {
//   mounted(el: HTMLElement, binding: DirectiveBinding<number>) {
//     console.log('mounted')
//     if (binding.value > 1)
//     {
//         console.log(el)
//         el.style.marginLeft = `${(binding.value-1) * 4}rem`;
//         el.style.position = 'relative';

//         for(let i = 2 ; i <= binding.value * 4 - 4 ; i = i + 4)
//         {
//             const beforeElement = document.createElement('div');
//             beforeElement.style.content = '';
//             beforeElement.style.position = 'absolute';
//             beforeElement.style.width = '1px';
//             beforeElement.style.height = '100%';
//             beforeElement.style.background = '#aaa';
//             beforeElement.style.left = `${-i}rem`;
//             beforeElement.style.top = '0';
//             el.insertAdjacentElement('afterbegin', beforeElement);
//         }
//     }
//   },
//   updated(el: HTMLElement, binding: DirectiveBinding<number>) {
//     // debugger
//     console.log('updated')
//     if (binding.value > 1)
//     {
//         console.log(el)
//         el.style.marginLeft = `${(binding.value-1) * 4}rem`;
//         el.style.position = 'relative';

//         for(let i = 2 ; i <= binding.value * 4 - 4 ; i = i + 4)
//         {
//             const beforeElement = document.createElement('div');
//             beforeElement.style.content = '';
//             beforeElement.style.position = 'absolute';
//             beforeElement.style.width = '1px';
//             beforeElement.style.height = '100%';
//             beforeElement.style.background = '#aaa';
//             beforeElement.style.left = `${-i}rem`;
//             beforeElement.style.top = '0';
//             el.insertAdjacentElement('afterbegin', beforeElement);
//         }
//     }
//   }
// }

export const indent = (() => {
    const beforeElementsMap = new Map();

    function RemoveElement(el: HTMLElement){
        const oldBeforeElements = beforeElementsMap.get(el) || [];
        // Xóa bỏ các phần tử cũ trong mảng tương ứng với el
        oldBeforeElements.forEach((elm:any) => elm.parentNode?.removeChild(elm));
    }

    return {
        mounted(el: HTMLElement, binding: DirectiveBinding<number>) {
            if (binding.value > 1)
            {
                beforeElementsMap.set(el, []);
                el.style.marginLeft = `${(binding.value-1) * 4}rem`;
                el.style.position = 'relative';
        
                for(let i = 2 ; i <= binding.value * 4 - 4 ; i = i + 4)
                {
                    const beforeElement = document.createElement('div');
                    beforeElement.style.content = '';
                    beforeElement.style.position = 'absolute';
                    beforeElement.style.width = '1px';
                    beforeElement.style.height = '100%';
                    beforeElement.style.background = '#aaa';
                    beforeElement.style.left = `${-i}rem`;
                    beforeElement.style.top = '0';
                    el.insertAdjacentElement('afterbegin', beforeElement);
                    beforeElementsMap.get(el)?.push(beforeElement);
                }
            }
          },
          updated(el: HTMLElement, binding: DirectiveBinding<number>) {
            if (binding.value > 1)
            {
                RemoveElement(el)

                beforeElementsMap.set(el, []); // Đặt lại mảng rỗng cho phần tử el

                el.style.marginLeft = `${(binding.value-1) * 4}rem`;
                el.style.position = 'relative';
        
                for(let i = 2 ; i <= binding.value * 4 - 4 ; i = i + 4)
                {
                    const beforeElement = document.createElement('div');
                    beforeElement.style.content = '';
                    beforeElement.style.position = 'absolute';
                    beforeElement.style.width = '1px';
                    beforeElement.style.height = '100%';
                    beforeElement.style.background = '#aaa';
                    beforeElement.style.left = `${-i}rem`;
                    beforeElement.style.top = '0';
                    el.insertAdjacentElement('afterbegin', beforeElement);
                    beforeElementsMap.get(el)?.push(beforeElement);
                }
            }
          },
          beforeUpdate(el: HTMLElement, binding: DirectiveBinding<number>) {
            if(binding.oldValue !== binding.value){
                el.style.marginLeft = `0`
                RemoveElement(el)
            }
          }
}
})();