FROM denoland/deno

EXPOSE 8000

WORKDIR /app

ADD . /app

RUN deno cache src/index.ts

CMD ["run", "--allow-env", "--allow-net", "src/index.ts"]