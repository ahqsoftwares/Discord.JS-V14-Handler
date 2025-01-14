const { DevGuild } = process.env;

/**
 *
 * @param {import("../Structures/bot")} client
 */
async function loadCommands(client) {
  client.commands.clear();
  client.subCommands.clear();

  let commandsArray = [];
  let developerArray = [];

  const Files = await client.utils.loadFiles("Commands");

  Files.forEach((file) => {
    const command = require(file);

    if (command.subCommand) {
      return client.subCommands.set(command.subCommand, command);
    }

    if (!command.data.name)
      return console.error(`[ERROR] Commnd: ${file} doesn't have a name!`);
    client.commands.set(command.data.name, command);

    if (command.developer) {
      developerArray.push(command.data.toJSON());
    } else {
      commandsArray.push(command.data.toJSON());
    }
  });
  client.application.commands.set(commandsArray);
}

module.exports = { loadCommands };
