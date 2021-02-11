const cookie = {
	 getCookie(name) {
	  const matches = document.cookie.match(new RegExp(
	    `(?:^|; )${name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1')}=([^;]*)`,
	  ));
	  return matches ? decodeURIComponent(matches[1]) : undefined;
  },
  setCookie(name, value, options) {
	  options = options || {};

	  const { expires } = options;

	  if (typeof expires === 'number' && expires) {
	    const d = new Date();
	    d.setTime(d.getTime() + expires * 1000);
	    expires = options.expires = d;
	  }
	  if (expires && expires.toUTCString) {
	    options.expires = expires.toUTCString();
	  }

	  value = encodeURIComponent(value);

	  const updatedCookie = `${name}=${value}`;

	  for (const propName in options) {
	    updatedCookie += `; ${propName}`;
	    const propValue = options[propName];
	    if (propValue !== true) {
	      updatedCookie += `=${propValue}`;
	    }
	  }

	  document.cookie = updatedCookie;
  },
  deleteCookie(name) {
	  	this.setCookie(name, '', {
	    	expires: -1,
    });
  },
};
export { cookie };
