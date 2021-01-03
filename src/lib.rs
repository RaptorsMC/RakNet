use deno_core::error::{ AnyError, anyhow };
use deno_core::plugin_api::{ Interface, Op, ZeroCopyBuf };
use deno_core::serde_json::{ json, Value };
use deno_json_op::json_op;

#[no_mangle]
pub fn deno_init_plugin(interface: &mut dyn Interface) {
    
}