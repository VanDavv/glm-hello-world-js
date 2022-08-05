const { Executor, Task, vm } = require("yajsapi");

process.env['YAGNA_APPKEY'] = '55359a3e7afb4525be26fff47accc41f';

async function main() {
  const task_package = await vm.repo({
    image_hash: "977cae92e8dbd509247ee23b5e8c7ed6b99e52ed5b54f30b7c2d771a",
  });
  const tasks = [new Task({})];

  async function* worker(context, tasks) {
    for await (let task of tasks) {
      context.send_file(path.join(__dirname, "./task.js"), "/golem/output/task.js");
      context.run("node", ["/golem/output/task.js", task.data()]);
      const future_result = yield context.commit();
      const { results } = await future_result;
      task.accept_result(results[results.length - 1]);
    }
  }

  const executor = new Executor({ task_package, budget: "1.0", subnet_tag: "devnet-beta" });
  await executor.ready(async (executor) => {
    for await (let completed of executor.submit(worker, tasks)) {
      console.log(completed.result().stdout);
    }
  });
}

main();
