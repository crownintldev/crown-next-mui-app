import toast from 'react-hot-toast'

export const capitalizeCamelSpace = (name) => {
  const capitalized = name.charAt(0).toUpperCase() + name.slice(1)

  return capitalized.replace(/([A-Z])/g, ' $1').trim()
}

export const axiosErrorMessage = (err) => {
  console.log(err)
  return err.response && err.response.data && err.response.data.message
    ? err.response.data.message
    : err.message
    ? err.message
    : 'An unexpected error occurred'
}
export const axiosSuccessToast = (data) => {
  if (data && data.message) {
    toast.success(data.message, { duration: 2000 })
  }
}

export const axiosErrorToast = (data) => {
  console.log('===dta', data)
  if ((data && data.message) || data) {
    const text = data.message ? data.message : data
    toast.error(text, { duration: 2000 })
  }
}

// check all name same
export const isAllSameinArray = (dataArray, name) => {
  if (dataArray.length === 0) return false // or true, based on how you want to treat an empty array
  const firstElementName = dataArray[0][name]

  return dataArray.every((item) => item[name] === firstElementName)
}

// export const capitalizeValue = value => <div style={{ textTransform: 'capitalize' }}>{value}</div>
export const capitalizeValue = (str) => {
  if (typeof str !== 'string' || !str) return str

  return str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}

//relace dash (-) with space and ever next word is capital,
export function capitalizeSplitDash(str) {
  return str ? str.replace(/-/g, ' ').replace(/\b\w/g, (match) => match.toUpperCase()):""
}

// remove undefined
export const removeUndefined = (data) => {
  for (let key in data) {
    if (data[key] === undefined || data[key] === '') {
      delete data[key]
    }
  }
}
export const currencyFormatter = (value, currency = null, format = 'en-PK') => {
  const options = {
    minimumFractionDigits: 0
  };

  if (currency) {
    options.style = 'currency';
    options.currency = currency;
  }

  const numberFormatter = new Intl.NumberFormat(format, options);
  return numberFormatter.format(value);
};


export const hasAdministrativeManageAll = (user, ability) => {
  if (user && ability.rules.length > 0) {
    let hasAbility = user.permissionsDetails?.some(
      (permissionDetail) =>
        permissionDetail.permission === 'administrative' &&
        permissionDetail.actions?.includes('manageAll')
    )
    if (hasAbility) {
      return true
    } else {
      return false
    }
  }
}
