import { getDelegator } from './utils';

async function main() {
  console.time('script_run_time');
  return await getDelegator('0x34Bb9e91dC8AC1E13fb42A0e23f7236999e063D4');
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
