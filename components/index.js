export {
  renderGCD,
  renderPrimeFactorization,
  renderSRTinZ,
  renderCongruenceEquation,
  renderEuler,
  renderPrimitiveRoot,
  renderDiscreteLogarithm,
  renderInverseZn,
  renderExponentialZn,
} from './math/index.js'

export {
  renderEncodeVigenere,
  renderDecodeVigenere,
  renderEncodeHill,
  renderDecodeHill,
  renderK1DES,
  renderEncodeAffine,
  renderEncodeAffineWithChar,
  renderRSA,
} from './crypto/index.js'

export const renderBlock = (
  classNameList,
  nameObj = {},
  options = {},
  ...callbacks
) => {
  const scrollTo = () => {
    const section = document.querySelector(`#section-${name}`)
    const coords = section.getBoundingClientRect()
    window.scrollTo({
      left: coords.left + window.pageXOffset,
      top: coords.top + window.pageYOffset - 100,
      behavior: 'smooth',
    })
  }

  const optionKeys = Object.keys(options) // [encode, decode]
  const [name] = Object.keys(nameObj)

  const navItemHTML = `
  <li class="nav__item">
    <a 
      class="nav__link section-${name}"
    >
      ${nameObj[name]}
    </a>
  </li>
  `

  const container = document.querySelector('.container')
  const navList = document.querySelector(`.${classNameList}`)

  navList.insertAdjacentHTML('beforeend', navItemHTML)

  // todo: handle nav link click then scroll to component
  document.querySelector(`.section-${name}`).addEventListener('click', scrollTo)

  const sectionHTML = `
  <section id="section-${name}" class="section">
    <div class="btn-group">
      ${optionKeys
        .map(
          (option, i) =>
            `
          <button
            class="btn section__btn btn__${name}--${optionKeys[i]} ${
              i === 0 ? 'active' : ''
            }"
          >
            ${options[optionKeys[i]].text}
          </button>
          `
        )
        .join('')}
    </div>

    ${optionKeys
      .map(
        (option, i) =>
          `
        <div 
          class="
            section__result 
            ${name}--${optionKeys[i]} 
            ${i === 0 ? 'active' : ''}
          "
        >
          <form action="" class="form">

            ${Object.keys(options[option].input)
              .map(
                // [plaintext, key]
                (item, i) => `
                  <div class="form-group">
                    <label 
                      for="input-${name}--${option}-${item}"
                    >
                      ${options[option].input[item]}
                    </label>
                    <input 
                      type="text" 
                      id="input-${name}--${option}-${item}" 
                    />
                  </div>
                `
              )
              .join('')}

            <button
              id="btn-submit-${name}--${optionKeys[i]}"
              type="submit"
              class="btn btn-submit"
            >
              Submit
            </button>
          </form>

          <div class="section__content btn-submit-${name}--${
            optionKeys[i]
          }"></div>
        </div>
        `
      )
      .join('')}
  </section>
  `

  document
    .querySelector('.container')
    .insertAdjacentHTML('beforeend', sectionHTML)

  // todo: handle submit button
  document
    .querySelector(`#section-${name}`)
    .addEventListener('click', function (e) {
      if (!e.target.classList.contains('btn-submit')) return

      const btnId = e.target.id
      const inputFields = e.target.closest('.form').querySelectorAll('input')
      const inputValues = []
      const contentEl = document.querySelector(`.${btnId}`)

      for (const input of inputFields) {
        inputValues.push(input.value)
      }

      if (inputValues.includes('')) return

      optionKeys.forEach((option, index) => {
        if (!btnId.includes(option)) return

        const result = callbacks[index](...inputValues)
        contentEl.innerHTML = result
      })
    })
}
