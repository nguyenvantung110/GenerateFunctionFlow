// directives/indent.ts
import { DirectiveBinding } from 'vue'

export default {
  mounted(el: HTMLElement, binding: DirectiveBinding<number>) {
    if (binding.value > 1)
    {
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
        }
    }
  },
  updated(el: HTMLElement, binding: DirectiveBinding<number>) {
    if (binding.value > 1)
    {
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
        }
    }
  }
}