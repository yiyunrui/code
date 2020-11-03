var encryption = function(key, val) {
	var encrypt = new JSEncrypt();
	encrypt.setPublicKey(key);
	var encrypted = encrypt.encrypt(val);
	return encrypted
}