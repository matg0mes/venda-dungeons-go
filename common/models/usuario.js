"use strict";

module.exports = function (Usuario) {
  const me = Usuario;
  const BadRequest = require("../exceptions/bad-request");

  me.login = async (credentials) => {
    try {
      if (!credentials.email || !credentials.senha)
        throw new BadRequest("É necessário preencher o email e a senha");

      const usuario = await me.findOne({ where: { email: credentials.email } });

      if (!usuario) throw new BadRequest("Usuário não encontrado!");

      if (credentials.senha !== usuario.senha)
        throw new BadRequest("Senha incorreta!");

      return usuario;
    } catch (err) {
      if (err instanceof BadRequest) {
        err.statusCode = 404
        return Promise.reject(err);
      }
      return Promise.reject(err);
    }
  };

  me.remoteMethod("login", {
    accepts: [
      {
        arg: "credentials",
        type: "object",
        required: true,
        http: { source: "body" },
      },
    ],
    description: "Fazer login com email e senha de um usuario",
    returns: {
      arg: "usuario",
      type: "object",
      root: true,
    },
    http: {
      path: "/login-usuario",
      verb: "post",
    },
  });
};
