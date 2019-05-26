import axios from 'axios'

let proxyAxios = {
	saveOrder: function(order){
		let url = "";
		axios
			.post(url, order)
			.catch(err => console.log(err))
	}
}
export default proxyAxios ;