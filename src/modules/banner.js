

const { version, homepage } = require('../../package.json');
const link = require('terminal-link');

module.exports = (leeks) => {
	console.log(leeks.colours.cyan(`
########  ####  ######   ######   #######  ########  ########
##     ##  ##  ##    ## ##    ## ##     ## ##     ## ##     ##
##     ##  ##  ##       ##       ##     ## ##     ## ##     ##
##     ##  ##   ######  ##       ##     ## ########  ##     ##
##     ##  ##        ## ##       ##     ## ##   ##   ##     ##
##     ##  ##  ##    ## ##    ## ##     ## ##    ##  ##     ##
########  ####  ######   ######   #######  ##     ## ########
######## ####  ######  ##    ## ######## ########  ######
   ##     ##  ##    ## ##   ##  ##          ##    ##    ##
   ##     ##  ##       ##  ##   ##          ##    ##
   ##     ##  ##       #####    ######      ##     ######
   ##     ##  ##       ##  ##   ##          ##          ##
   ##     ##  ##    ## ##   ##  ##          ##    ##    ##
   ##    ####  ######  ##    ## ########    ##     ######
`));
	console.log(leeks.colours.cyanBright(`DiscordTickets bot v${version} by Vision`));
	console.log(leeks.colours.cyanBright(homepage + '\n'));

	console.log('\n\n');
}; 