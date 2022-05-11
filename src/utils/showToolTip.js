export const showToolTip = e => {
  let ToolTip = document.querySelector(`#${e} .tooltipstext`);
  let ToolTipVisible = document.querySelector(
    `#${e} .tooltipstext.showTooltip`,
  );

  if (!ToolTipVisible) {
    if (ToolTip) {
      ToolTip.classList.add('showTooltip');
    }
  } else {
    ToolTip.classList.remove('showTooltip');
  }
};
