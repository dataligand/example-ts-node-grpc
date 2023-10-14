import * as grpc from "@grpc/grpc-js";
import { EchoClient, Query, Response } from "./grpc/storage";

const echoClient = new EchoClient(
  "0.0.0.0:4884",
  grpc.credentials.createInsecure()
);

function callbackHandler(err: grpc.ServiceError | null, value?: Response) {
  if (err) {
    console.log("err", err);
  }

  console.log("value", value);
}

echoClient.echo(new Query({ name: "James" }), callbackHandler);
