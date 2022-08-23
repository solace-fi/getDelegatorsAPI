import { getDelegator } from './utils';

async function main() {
  console.time('script_run_time');
  return await getDelegator('0x501ACe67a1cba9ca9793c300B3AEB29394ae8C7b');
}

main()
  .then((resp) => {
    console.log(resp);
    console.log('SUCCESS!');
    console.timeEnd('script_run_time');
  })
  .catch((e) => {
    console.error(e);
    console.log('FAILED!');
    console.timeEnd('script_run_time');
  });
