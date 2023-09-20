import ProxeusNode from 'src/libs/proxeus-node';
import {
  OnNextHandler,
  OnGetConfigHandler,
  OnSetConfigHandler,
  OnRemoveHandler,
  OnCloseHandler,
} from 'src/handlers';

async function boilerplate() {
  try {
    ProxeusNode.setOnNextHandler(OnNextHandler);
    ProxeusNode.setOnGetConfigHandler(OnGetConfigHandler);
    ProxeusNode.setOnSetConfigHandler(OnSetConfigHandler);
    ProxeusNode.setOnRemoveHandler(OnRemoveHandler);
    ProxeusNode.setOnCloseHandler(OnCloseHandler);

    await ProxeusNode.register();
  } catch (error) {
    console.error(error);

    process.exit(1);
  }
}

boilerplate();
