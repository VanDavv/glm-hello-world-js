const { Executor, Task, vm } = require("yajsapi");
const path = require("path");

process.env['YAGNA_APPKEY'] = '55359a3e7afb4525be26fff47accc41f';

async function main() {
  const task_package = await vm.repo({
    image_hash: "3babd3287200a8d2b88639dec060092c897dd6a7562665a08cc5c885",
  });
  const tasks = [new Task(process.argv[2] || "unknown")];

  async function* worker(context, tasks) {
    for await (let task of tasks) {
      context.send_file(path.join(__dirname, "./task.js"), "/golem/input/task.js");
      context.run("/usr/local/bin/node", ["/golem/input/task.js", task.data()]);
      const future_result = yield context.commit();
      const { results } = await future_result;
      task.accept_result(results[results.length - 1]);
    }
  }

  const executor = new Executor({ task_package, budget: "1.0", subnet_tag: "devnet-beta" });
  await executor.run(async (executor) => {
    for await (let completed of executor.submit(worker, tasks)) {
      console.log(completed.result().stdout);
    }
  });
}

main();
