import ProxeusNode from 'src/libs/proxeus-node';

async function boilerplate() {
  try {
    await ProxeusNode.register();
  } catch (error) {
    process.exit(1);
  }
}

boilerplate();
