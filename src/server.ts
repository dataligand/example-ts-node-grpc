import * as grpc from "@grpc/grpc-js";
import { Query, UnimplementedEchoService, Response } from "./grpc/storage";

class Echo extends UnimplementedEchoService {
  echo(
    call: grpc.ServerUnaryCall<Query, Response>,
    callback: grpc.requestCallback<Response>
  ): void {
    console.log(call.request.name);
    callback(null, new Response({ name: call.request.name }));
  }
}

const server = new grpc.Server();

server.addService(UnimplementedEchoService.definition, new Echo());

server.bindAsync(
  "0.0.0.0:4884",
  grpc.ServerCredentials.createInsecure(),
  (err, port) => {
    if (err) {
      console.log("err: ", err);
    }
    server.start();
    console.log(`listening on port ${port}`);
  }
);
