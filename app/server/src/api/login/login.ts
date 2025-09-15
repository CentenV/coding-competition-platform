/**
 * @file /login endpoints
 * */

import { createEndpointRouter } from "@/endpoint-router.ts";
import type { Router } from "express";
import { passport } from "@/api/auth.ts"
import {  } from "@codecompplat/database"

const router: Router = createEndpointRouter();

router.post("/login", (res, req) => {
  passport.authenticate("local", (err, user: , info) => {
    if (err) {
      return res.statusCode(401).json();
    }
  })
});
